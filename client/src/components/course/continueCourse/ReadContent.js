import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";

const ReadContent = (props) => {
  const Content = useSelector((state) => state.continueCourseReducer.content);
  return (
    <div>
      <h3>{Content?.title}</h3>

      <div>
        {Content.items.map((item) => (
          <div>
            {item.text && <p>{item.text}</p>}
            {item.imageUrl && (
              <Image
                className={"w-100"}
                src={item.imageUrl}
                alt={item.imageAlt}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadContent;
