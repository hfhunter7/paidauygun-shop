import { ACTION } from 'utils/constants';

export const renderTitle = (action) => {
  switch (action){
    case ACTION.CREATE:
      return 'สร้าง'
    case ACTION.UPDATE:
      return 'แก้ไข'
    case ACTION.PREVIEW:
      return 'ดูรายละเอียด'
    default:
      return null
  }
}
