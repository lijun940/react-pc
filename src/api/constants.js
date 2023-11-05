const ArticleStatus = [
  {
    id: -1,
    name: '全部',
    color: 'magenta',
  },
  {
    id: 0,
    name: '草稿',
    color: '#d48806',
  },
  {
    id: 1,
    name: '待审很',
    color: 'red',
  },
  {
    id: 2,
    name: '审核通过',
    color: 'green',
  },
  {
    id: 3,
    name: '审核失败',
    color: 'cyan',
  },
]
const ArticleImg = [
  {
    id: 1,
    name: '单图',
  },
  {
    id: 3,
    name: '三图',
  },
  {
    id: 0,
    name: '无图',
  },
]
const ArticleStatusMap = Object.fromEntries(
  ArticleStatus.map((item) => [item.id, item.name])
)
const ArticleStatusColorMap = Object.fromEntries(
  ArticleStatus.map((item) => [item.id, item.color])
)
export { ArticleStatus, ArticleImg, ArticleStatusMap, ArticleStatusColorMap }
