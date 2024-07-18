
 const FaceRecognition =  ({imageURL,boxes})=>{
    
    return (
        <section className="text-center ">
            <div className="hide-child relative center max-w-[400px]" >
                { (imageURL)
                    ?
                    <img src={imageURL} className="db shadow-5 border border-gray-800 mt-7 relative " alt="Photo" height="auto" id="inputImage" />
                    :
                    ""
                }
                {boxes.map((box, index)=>{
                        return <div className="bounding-box" key={index} style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left: box.leftCol}}></div>
                    })
                }
            </div>
        </section>
    );
}
export default FaceRecognition