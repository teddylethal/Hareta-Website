export type ItemGroup = {
  id: string
  status: number
  created_at: string
  updated_at: string
  name: string
}

export type ItemGroupList = {
  data: ItemGroup[]
  filter: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}
