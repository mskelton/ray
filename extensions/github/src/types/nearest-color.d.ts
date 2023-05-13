declare module "nearest-color" {
  type ColorMap = { [key: string]: string }
  type ColorMatch = { name: string; value: string; distance: number }
  type NearestColor = (color: string) => ColorMatch

  export function from(colors: ColorMap): NearestColor
}
