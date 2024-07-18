

 const Navigation =  ({onRouteChange,singOut})=>{
    return (
        <nav className="absolute sm:top-[80px] top-[35px] right-[4%] text-[18px] sm:text-[24px]">
            <p onClick={()=>{
                singOut();
                onRouteChange('singin')
                }} className="sm:text-[24px] text-[18px] link dim black underline pointer pa-3" >Sing Out</p>
        </nav>
    );
}
export default Navigation