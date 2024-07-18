
 const Rank =  ({currentRank,name})=>{
    return (
        <div >
            <div className="text-white text-center md:text-5xl sm:text-4xl min-[450px]:text-3xl text-2xl">
                {`${name} your current rank is `}
            </div>
            <div className="text-white text-center md:text-6xl sm:text-5xl min-[450px]:text-4xl text-3xl rank-icon">
                {`#${currentRank} `}
            </div>
        </div> 
    );
}
export default Rank