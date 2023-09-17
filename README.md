# Time Off Stats

## Description

A simple website to visualize your data from [Time Off ⚡ by Deel](https://mazein.slack.com/apps/AELEX1TU3-time-off-by-deel).

## Usage

1. Download your data from [Time Off ⚡ by Deel](https://mazein.slack.com/apps/AELEX1TU3-time-off-by-deel).
2. Go to [Time Off Stats](https://time-off-stats.vercel.app/).
3. Drop your file in the dropzone.
4. Enjoy!

## Development

To run the repo:

```bash
pnpm install
pnpm dev
```

---

# Todo

1. Layout
   1. Header
   2. Subtitle
   3. Dropzone
   4. FAQ
2. After import
   1. Title
   2. Date picker
   3. Total Metric
   4. Pie with %
   5. Bar list
   6. Monthly chart (bar or line)

Logic:

- Dropzone
  - Read file
  - Parse file
  - Save in state the various metrics

Time periods:

- Month
- Quarter
- 6 months
- Year
- All time
- Custom
