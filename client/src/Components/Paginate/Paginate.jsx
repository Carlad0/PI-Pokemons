
// const Paginate = ({ pokemonsPerPage, pokemons, paginate}) => {
//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(pokemons/pokemonsPerPage); i++) {
//         pageNumbers.push(i);
        
//     }

//     return(
//         <div>
//             <nav>
//                 <ul className='paginate'>
//                     { pageNumbers &&
//                     pageNumbers.map(number => (
//                         <li className="number" key={number}>
//                         <a onClick={() => paginate(number)}>{number}</a>
//                     </li>))}
//                 </ul>
                
//             </nav>

//         </div>
//     )
// }

// export default Paginate;