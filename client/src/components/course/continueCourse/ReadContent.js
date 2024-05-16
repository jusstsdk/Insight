import {useSelector} from "react-redux";

const ReadContent = (props) => {
    const Content = useSelector((state) => state.continueCourseReducer.content);

    console.log(Content)
    return (
        <div>
            <h3>{Content?.title}</h3>

            <div>
                {Content.items.map(item => (
                    <div>
                        {item.text && <p>{item.text}</p>}
                        {item.imageUrl && <img src={item.imageUrl} alt={item.imageAlt}/>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReadContent