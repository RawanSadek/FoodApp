
export default function Sidebar({logout}) {
  return (
    <div>
      <button onClick={logout} className='btn btn-danger text-white'>logout</button>
    </div>
  )
}
