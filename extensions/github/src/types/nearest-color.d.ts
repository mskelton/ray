declare module "nearest-color" {
  type ColorMap = { [key: string]: string }
  type ColorMatch = { distance: number; name: string; value: string }
  type NearestColor = (color: string) => ColorMatch

  export function from(colors: ColorMap): NearestColor
}
