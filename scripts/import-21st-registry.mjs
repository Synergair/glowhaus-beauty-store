import fs from "node:fs/promises";
import path from "node:path";

const urls = [
  "https://21st.dev/r/shadcn/accordion",
  "https://21st.dev/r/shadcn/badge",
  "https://21st.dev/r/originui/button",
  "https://21st.dev/r/shadcn/card",
  "https://21st.dev/r/originui/checkbox",
  "https://21st.dev/r/originui/command",
  "https://21st.dev/r/originui/dialog",
  "https://21st.dev/r/originui/dropdown-menu",
  "https://21st.dev/r/originui/input",
  "https://21st.dev/r/shadcn/label",
  "https://21st.dev/r/originui/popover",
  "https://21st.dev/r/shadcn/progress",
  "https://21st.dev/r/originui/radio-group",
  "https://21st.dev/r/shadcn/scroll-area",
  "https://21st.dev/r/originui/select",
  "https://21st.dev/r/shadcn/skeleton",
  "https://21st.dev/r/originui/table",
  "https://21st.dev/r/originui/tabs",
  "https://21st.dev/r/originui/textarea",
  "https://21st.dev/r/originui/tooltip"
];

const dependencySet = new Set();
const sourceMap = [];

for (const url of urls) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const spec = await response.json();
  if (spec.error) {
    throw new Error(`Component fetch error for ${url}: ${spec.error}`);
  }

  const files = Array.isArray(spec.files) ? spec.files : [];
  const dependencies = Array.isArray(spec.dependencies) ? spec.dependencies : [];

  for (const dependency of dependencies) {
    dependencySet.add(dependency);
  }

  for (const file of files) {
    const sourcePath = file.path || file.target;
    if (!sourcePath || !file.content) {
      continue;
    }

    const normalized = sourcePath.replace(/^\//, "");
    const relative = normalized.replace(/^components\//, "");
    const outputPath = path.join(process.cwd(), "components", "registry", relative);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, file.content, "utf8");

    sourceMap.push({
      url,
      source: sourcePath,
      target: path.relative(process.cwd(), outputPath)
    });
  }
}

const summary = {
  urls,
  installedAt: new Date().toISOString(),
  dependencies: Array.from(dependencySet).sort(),
  sources: sourceMap
};

await fs.writeFile(
  path.join(process.cwd(), "components", "registry", "21st-import-summary.json"),
  JSON.stringify(summary, null, 2),
  "utf8"
);

console.log(JSON.stringify(summary, null, 2));
