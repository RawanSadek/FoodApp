import noDataImg from '../../../../assets/Images/nodata.png'

export default function NoData() {
  return (
    <div className='text-center'>
      <img src={noDataImg} alt="no data"/>
      <div className='w-50 m-auto'>
      <h5>No Data !</h5>
      <p className='text-secondary w-75 m-auto'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
    </div>
  )
}
