# usage: bash ./scripts/buildOverrides.sh
tsc ./src/lib/theme/generateOverrides.ts --module commonjs
node ./src/lib/theme/generateOverrides.js
yarn less-watch-compiler ./src/lib/theme ./public varnish-theme.less --enable-js --run-once
# cleanup
paths=(
    "./public/theme-overrides.less"
    "./src/lib/theme/breakpoints.js"
    "./src/lib/theme/button.js"
    "./src/lib/theme/colors.js"
    "./src/lib/theme/DefaultVarnishTheme.js"
    "./src/lib/theme/fontWeight.js"
    "./src/lib/theme/generateOverrides.js"
    "./src/lib/theme/link.js"
    "./src/lib/theme/palette.js"
    "./src/lib/theme/spacing.js"
    "./src/lib/theme/typography.js"
    "./src/lib/utils/base.js"
)
for path in "${paths[@]}"
do
    rm "$path"
done
