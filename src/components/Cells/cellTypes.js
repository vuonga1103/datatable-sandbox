import DefaultCellComponent from './DefaultCell'
import IconCellComponent from './IconCell'

export const DefaultCell = 'default'
export const IconCell = 'icon'

export const cellTypes = {
  [DefaultCell]: DefaultCellComponent,
  [IconCell]: IconCellComponent,
}
