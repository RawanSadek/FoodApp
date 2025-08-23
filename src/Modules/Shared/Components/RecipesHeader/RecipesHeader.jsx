import { useNavigate } from 'react-router-dom'

export default function RecipesHeader({ title = 'Fill', btnText }) {
    let navigate = useNavigate();
    // let location = useLocation();
    // let text = location.state?.text;
    return (
        <div className="recipes-header py-4 px-5 mt-4 rounded-4 d-flex justify-content-between align-items-center">
            <div>
                <h4>{title} the <span className='theme-green-text'>Recipes</span> !</h4>
                <p>you can now <span className='text-lowercase'>{title}</span> the meals easily using the table and form ,<br /> click here and sill it with the table !</p>
            </div>
            <button onClick={() => {
                navigate('/dashboard/recipes');
            }} className='btn auth-btn theme-green-bg text-white px-5 py-2'>{btnText} Recipes <i className="fa-solid fa-arrow-right text-white"></i></button>
        </div>
    )
}
