export const crudOptions = function (vm) {
  return {
    columns: [
      {
        title: 'ID',
        key: 'id',
        sortable: true,
        width: 90
      },
      {
        title: '素材名称',
        key: 'name',
        width: 120,
        form: {
          disabled: true
        }
      },
      {
        title: '素材分类',
        key: 'category_name',
        sortable: true
      },
      {
        title: '权限模板',
        key: 'competence_name'
      },
      {
        title: '素材类型',
        key: 'type'
      },
      {
        title: '创建日期',
        key: 'created_at'
      },
      {
        title: '状态',
        key: 'is_enable'
      }
    ]
  }
}
