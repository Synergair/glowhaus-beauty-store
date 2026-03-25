import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

export const runtime = "nodejs";

const CLONE_ROOT = process.env.GLOWHAUS_CLONE_ROOT?.trim() || null;
const KIYOKO_ORIGIN = "https://kiyoko.ca";
const UPSTREAM_TIMEOUT_MS = 9000;
const STATIC_ASSET_EXTENSION =
  /\.(?:css|js|mjs|json|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|eot|otf|mp4|webm|mov|m3u8|ts)(?:[?#]|$)/i;
const REMOTE_ASSET_PREFIXES = [
  "/cdn/",
  "/cdn-cgi/",
  "/services/",
  "/shopifycloud/",
  "/s/files/"
] as const;
const THIRD_PARTY_SCRIPT_PATTERN =
  /<script[^>]+src=["'](?:\/_external\/|(?:https?:)?\/\/(?:www\.)?(?:googletagmanager\.com|connect\.facebook\.net|analytics\.tiktok\.com|static(?:-tracking)?\.klaviyo\.com|js\.adsrvr\.org|bat\.bing\.com|cdn\.mouseflow\.com|js-agent\.newrelic\.com|bam\.nr-data\.net|static\.hotjar\.com|www\.mczbf\.com|c\.amazon-adsystem\.com|static\.narrativ\.com|na-library\.klarnaservices\.com|js\.squarecdn\.com|checkoutshopper-live\.adyen\.com)[^"']*)["'][^>]*>\s*<\/script>/gi;
const THIRD_PARTY_LINK_PATTERN =
  /<link[^>]+href=["'](?:\/_external\/|(?:https?:)?\/\/(?:www\.)?(?:checkoutshopper-live\.adyen\.com|static(?:-tracking)?\.klaviyo\.com|fonts\.googleapis\.com)[^"']*)["'][^>]*>/gi;
const GLOWHAUS_PRODUCT_IMAGES = Array.from({ length: 8 }, (_, index) => {
  return `/glowhaus-images/gh-product-${String(index + 1).padStart(2, "0")}.webp`;
});
const PRODUCT_FILE_EXCLUDE = [
  "logo_kiyoko",
  "kiyoko_website_favicon",
  "glowhaus_logo",
  "glowhaus_favicon",
  "store_download_button",
  "kiyoko_app_download",
  "kiyoko_url_display_image_banner",
  "social_icon",
  "payment",
  "badge",
  "flag",
  "icon"
];

const BRAND_PATCH = `<style id="gh-brand-patch">
:root {
  --gh-logo-font: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

img[alt*="kiyoko" i],
img[src*="kiyoko_website_logo" i],
img[src*="kiyoko-logo" i] {
  opacity: 0 !important;
}

img[src*="Glowhaus_Logo.svg"] {
  opacity: 1 !important;
  width: min(46vw, 280px) !important;
  height: auto !important;
  max-width: 280px !important;
}

[class*="header__heading-logo-wrapper"],
[class*="HeaderLogostyles__Wrapper"] {
  position: relative !important;
  min-height: 44px !important;
}

[class*="header__heading-logo-wrapper"]::after,
[class*="HeaderLogostyles__Wrapper"]::after {
  content: "GLOWHAUS";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--gh-logo-font);
  font-size: clamp(28px, 2.8vw, 44px);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #111111;
  pointer-events: none;
}
</style>
<script id="gh-brand-runtime">
(function () {
  var productImagePool = ${JSON.stringify(GLOWHAUS_PRODUCT_IMAGES)};
  var productImageMap = new Map();
  var productCursor = 0;

  var replacements = [
    [/Kiyoko Beauty/gi, "Glowhaus"],
    [/\\bKIYOKO\\b/g, "GLOWHAUS"],
    [/\\bKiyoko\\b/g, "Glowhaus"],
    [/kiyoko\\.ca/gi, "glowhaus.com"],
    [/@kiyoko\\.beauty/gi, "@glowhaus.beauty"],
    [/kiyokobeauty/gi, "glowhausbeauty"]
  ];

  function applyReplacement(value) {
    var next = value;
    for (var i = 0; i < replacements.length; i += 1) {
      next = next.replace(replacements[i][0], replacements[i][1]);
    }
    return next;
  }

  function patchTextNodes(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue) continue;
      var replaced = applyReplacement(node.nodeValue);
      if (replaced !== node.nodeValue) {
        node.nodeValue = replaced;
      }
    }
  }

  function patchAttributes(root) {
    if (!root || !root.querySelectorAll) return;
    var attrs = ["alt", "title", "aria-label", "placeholder"];
    var selector = attrs.map(function (attr) { return "[" + attr + "]"; }).join(",");
    var elements = root.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i += 1) {
      var el = elements[i];
      for (var j = 0; j < attrs.length; j += 1) {
        var attr = attrs[j];
        var value = el.getAttribute(attr);
        if (!value) continue;
        var replaced = applyReplacement(value);
        if (replaced !== value) {
          el.setAttribute(attr, replaced);
        }
      }
    }
  }

  function shouldReplaceProductSrc(src) {
    if (!src) return false;
    var lower = src.toLowerCase();
    if (!lower.includes("/cdn/shop/files/")) return false;
    var deny = ${JSON.stringify(PRODUCT_FILE_EXCLUDE)};
    for (var i = 0; i < deny.length; i += 1) {
      if (lower.includes(deny[i])) return false;
    }
    return /\\.(png|jpe?g|webp|avif)(\\?|$)/i.test(lower);
  }

  function normalizeAssetKey(src) {
    var clean = src.split("?")[0];
    return clean.substring(clean.lastIndexOf("/") + 1).toLowerCase();
  }

  function nextProductImageFor(src) {
    var key = normalizeAssetKey(src);
    if (productImageMap.has(key)) return productImageMap.get(key);
    var next = productImagePool[productCursor % productImagePool.length];
    productCursor += 1;
    productImageMap.set(key, next);
    return next;
  }

  function patchProductImages(root) {
    if (!root || !root.querySelectorAll) return;
    var imgs = root.querySelectorAll('img[src*="/cdn/shop/files/"]');
    for (var i = 0; i < imgs.length; i += 1) {
      var img = imgs[i];
      var src = img.getAttribute("src") || "";
      if (!shouldReplaceProductSrc(src)) continue;
      var replacement = nextProductImageFor(src);
      img.setAttribute("src", replacement);
      img.setAttribute("srcset", replacement + " 1x, " + replacement + " 2x");
    }
  }

  function run() {
    document.title = applyReplacement(document.title);
    patchTextNodes(document.body);
    patchAttributes(document.body);
    patchProductImages(document.body);

    var logoImages = document.querySelectorAll(
      'img[src*="Logo_Kiyoko"], img[src*="kiyoko_website_logo"], img[alt*="kiyoko" i]'
    );
    for (var i = 0; i < logoImages.length; i += 1) {
      var img = logoImages[i];
      img.setAttribute("src", "/cdn/shop/files/Glowhaus_Logo.svg");
      img.setAttribute("srcset", "/cdn/shop/files/Glowhaus_Logo.svg 1x");
      img.setAttribute("alt", "Glowhaus");
      img.style.opacity = "1";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i += 1) {
      var mutation = mutations[i];
      for (var j = 0; j < mutation.addedNodes.length; j += 1) {
        var node = mutation.addedNodes[j];
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.nodeValue) {
            var replaced = applyReplacement(node.nodeValue);
            if (replaced !== node.nodeValue) {
              node.nodeValue = replaced;
            }
          }
          continue;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        patchTextNodes(node);
        patchAttributes(node);
        patchProductImages(node);
      }
    }
  });

  observer.observe(document.documentElement, { subtree: true, childList: true });
})();
</script>`;

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m3u8": "application/vnd.apple.mpegurl",
  ".ts": "video/mp2t"
};

function normalizeTargetPath(pathname: string) {
  const withoutHash = pathname.split("#")[0] ?? "/";
  const withLeadingSlash = withoutHash.startsWith("/") ? withoutHash : `/${withoutHash}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/");
}

function resolveTarget(rawTarget: string | null): { pathname: string; search: string } {
  let candidate = (rawTarget ?? "/").trim() || "/";

  try {
    candidate = decodeURIComponent(candidate);
  } catch {
    // Keep original candidate if decode fails.
  }

  if (!candidate.startsWith("/")) {
    try {
      const absolute = new URL(candidate);
      candidate = `${absolute.pathname}${absolute.search}`;
    } catch {
      candidate = `/${candidate}`;
    }
  }

  const parsed = new URL(candidate, "https://local.glowhaus");
  const pathname = normalizeTargetPath(parsed.pathname);
  const search = parsed.search;

  if ((pathname === "/__sonar_uncloned/index.html" || pathname === "/__sonar_preview/index.html") && search) {
    const nestedTarget = parsed.searchParams.get("target");
    if (nestedTarget) {
      return resolveTarget(nestedTarget);
    }
  }

  return { pathname, search };
}

function normalizeRelativePath(targetPath: string) {
  const normalized = normalize(targetPath.replace(/^\/+/, ""));
  if (normalized.startsWith("..")) {
    return null;
  }
  return normalized === "." ? "" : normalized;
}

async function isFile(path: string) {
  try {
    const fileStat = await stat(path);
    return fileStat.isFile();
  } catch {
    return false;
  }
}

async function resolveLocalPath(targetPath: string) {
  if (!CLONE_ROOT) {
    return null;
  }

  const relative = normalizeRelativePath(targetPath);
  if (relative === null) {
    return null;
  }

  const hasExtension = extname(relative) !== "";
  const candidates: string[] = [];

  if (!relative) {
    candidates.push(join(CLONE_ROOT, "index.html"));
  } else {
    const base = join(CLONE_ROOT, relative);
    if (hasExtension) {
      candidates.push(base);
    } else {
      candidates.push(join(base, "index.html"), `${base}.html`, base);
    }
  }

  for (const candidate of candidates) {
    if (await isFile(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function fetchUpstream(targetPath: string, search: string, isHead: boolean) {
  const upstream = new URL(targetPath, KIYOKO_ORIGIN);
  upstream.search = search;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(upstream, {
      method: isHead ? "HEAD" : "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        accept: "*/*"
      }
    });

    if (!response.ok) {
      return null;
    }

    return response;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function transformHtml(html: string) {
  const normalizeKiyokoOrigin = (_match: string, rawPath?: string) => {
    const path = rawPath ?? "";
    if (!path) {
      return "";
    }
    if (
      REMOTE_ASSET_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
      STATIC_ASSET_EXTENSION.test(path)
    ) {
      return `${KIYOKO_ORIGIN}${path}`;
    }
    return path;
  };

  const transformed = html
    .replace(/(?:https?:)?\/\/(?:www\.)?kiyoko\.ca(\/[^"'\s<>]*)?/gi, normalizeKiyokoOrigin)
    .replace(/\/__sonar_(?:uncloned|preview)\/index\.html\?([^"'\s>#]+)/gi, (_match, query) => {
      const params = new URLSearchParams(query as string);
      const target = params.get("target");
      if (!target) {
        return "/";
      }
      try {
        const decoded = decodeURIComponent(target);
        return decoded.startsWith("/") ? decoded : `/${decoded}`;
      } catch {
        return target.startsWith("/") ? target : `/${target}`;
      }
    })
    .replace(/Kiyoko Beauty/gi, "Glowhaus")
    .replace(/\bKIYOKO\b/g, "GLOWHAUS")
    .replace(/\bKiyoko\b/g, "Glowhaus")
    .replace(/@kiyoko\.beauty/gi, "@glowhaus.beauty")
    .replace(/kiyokobeauty/gi, "glowhausbeauty")
    .replace(/spring-beauty-shop\.myshopify\.com/gi, "glowhaus-beauty.myshopify.com")
    .replace(/\/cdn\/shop\/files\/Kiyoko_website_favicon[^"'\s)]+/gi, "/cdn/shop/files/Glowhaus_favicon.svg")
    .replace(/\/cdn\/shop\/files\/Logo_Kiyoko[^"'\s)]+\.svg/gi, "/cdn/shop/files/Glowhaus_Logo.svg")
    .replace(
      /\/cdn\/shop\/files\/Kiyoko_URL_Display_Image_Banner_1[^"'\s)]+/gi,
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=80"
    )
    .replace(
      /\/cdn\/shop\/files\/Kiyoko_App_Download_1[^"'\s)]+/gi,
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
    )
    .replace(THIRD_PARTY_SCRIPT_PATTERN, "")
    .replace(THIRD_PARTY_LINK_PATTERN, "")
    .replace(/<style id="gh-brand-patch">[\s\S]*?<\/script>/gi, "");

  const withGlowhausProductAssets = replaceProductAssets(transformed);

  if (withGlowhausProductAssets.includes("gh-brand-patch")) {
    return withGlowhausProductAssets;
  }

  return withGlowhausProductAssets.includes("</head>")
    ? withGlowhausProductAssets.replace("</head>", `${BRAND_PATCH}</head>`)
    : `${BRAND_PATCH}${withGlowhausProductAssets}`;
}

function contentTypeFor(path: string) {
  return CONTENT_TYPES[extname(path).toLowerCase()] ?? "application/octet-stream";
}

function shouldReplaceProductAsset(url: string) {
  const lower = url.toLowerCase();
  if (!lower.includes("/cdn/shop/files/")) {
    return false;
  }
  if (!/\.(png|jpe?g|webp|avif)(\?|$)/i.test(lower)) {
    return false;
  }
  return !PRODUCT_FILE_EXCLUDE.some((term) => lower.includes(term));
}

function normalizeProductAssetKey(url: string) {
  const clean = url.split("?")[0] ?? url;
  const segments = clean.split("/");
  return (segments[segments.length - 1] ?? clean).toLowerCase();
}

function replaceProductAssets(html: string) {
  const fileMap = new Map<string, string>();
  let cursor = 0;

  return html.replace(/\/cdn\/shop\/files\/[^"'\s)]+\.(?:png|jpe?g|webp|avif)(?:\?[^"'\s)]*)?/gi, (match) => {
    if (!shouldReplaceProductAsset(match)) {
      return match;
    }
    const key = normalizeProductAssetKey(match);
    const existing = fileMap.get(key);
    if (existing) {
      return existing;
    }
    const replacement = GLOWHAUS_PRODUCT_IMAGES[cursor % GLOWHAUS_PRODUCT_IMAGES.length];
    cursor += 1;
    fileMap.set(key, replacement);
    return replacement;
  });
}

function buildEndpointStub(targetPath: string) {
  if (targetPath === "/manifest") {
    return new Response("{}", {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=3600",
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  if (targetPath.startsWith("/gc011ect")) {
    return new Response("", {
      status: 200,
      headers: {
        "content-type": "application/javascript; charset=utf-8",
        "cache-control": "public, max-age=86400",
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  if (targetPath.startsWith("/on") || targetPath.startsWith("/on-v2")) {
    return new Response(null, {
      status: 204,
      headers: {
        "cache-control": "public, max-age=86400",
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  if (targetPath.startsWith("/dw/shop")) {
    return new Response("{}", {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=60",
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  return null;
}

async function buildResponse(request: Request, isHead = false) {
  const requestUrl = new URL(request.url);
  const headerTarget = request.headers.get("x-glowhaus-target");
  const target = resolveTarget(headerTarget ?? requestUrl.searchParams.get("target"));
  const targetPath = target.pathname;
  const targetSearch = target.search;
  const endpointStub = buildEndpointStub(targetPath);
  if (endpointStub) {
    return isHead ? new Response(null, { status: endpointStub.status, headers: endpointStub.headers }) : endpointStub;
  }

  const localPath = await resolveLocalPath(targetPath);

  if (localPath) {
    const extension = extname(localPath).toLowerCase();
    const contentType = contentTypeFor(localPath);
    const cacheControl =
      extension === ".html" || extension === ".htm"
        ? "no-store, must-revalidate"
        : "public, max-age=86400, stale-while-revalidate=604800";

    if (isHead) {
      return new Response(null, {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": cacheControl,
          "x-glowhaus-clone-page": "1"
        }
      });
    }

    if (extension === ".html" || extension === ".htm") {
      const html = await readFile(localPath, "utf8");
      return new Response(transformHtml(html), {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": cacheControl,
          "x-glowhaus-clone-page": "1"
        }
      });
    }

    const bytes = await readFile(localPath);
    return new Response(bytes, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": cacheControl,
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  const upstreamResponse = await fetchUpstream(targetPath, targetSearch, isHead);
  if (!upstreamResponse) {
    return new Response("Not found", { status: 404 });
  }

  const upstreamContentType =
    upstreamResponse.headers.get("content-type") ?? contentTypeFor(targetPath || "/index.html");
  const targetExt = extname(targetPath).toLowerCase();
  const looksHtml = upstreamContentType.toLowerCase().includes("text/html") || targetExt === "";
  const upstreamCacheControl = looksHtml
    ? "no-store, must-revalidate"
    : "public, max-age=3600, stale-while-revalidate=86400";

  if (isHead) {
    return new Response(null, {
      status: 200,
      headers: {
        "content-type": upstreamContentType,
        "cache-control": upstreamCacheControl,
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  if (looksHtml) {
    const html = await upstreamResponse.text();
    return new Response(transformHtml(html), {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store, must-revalidate",
        "x-glowhaus-clone-page": "1"
      }
    });
  }

  return new Response(upstreamResponse.body, {
    status: 200,
    headers: {
      "content-type": upstreamContentType,
      "cache-control": upstreamCacheControl,
      "x-glowhaus-clone-page": "1"
    }
  });
}

export async function GET(request: Request) {
  return buildResponse(request);
}

export async function HEAD(request: Request) {
  return buildResponse(request, true);
}
