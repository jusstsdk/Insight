import { useSelector } from "react-redux";
import PersonalInfo from "./PersonalInfo";
import CourseTraineePOV from "./CourseTraineePOV";

function TraineeView() {
	const { firstName, lastName, gender, courses, paymentMethods } = useSelector(
		(state) => state.userReducer.user
	);
	const myCourse = JSON.parse(
		'{"_id":{"$oid":"638d02857d487a69463ee8c1"},"title":"CSEN 101","subjects":["CS","Math"],"summary":"Some interesting summary","originalPrice":10,"previewVideo":"https://www.youtube.com/embed/Nv5pIhub9wY","instructors":[{"_id": "638a7df37602ce159cc61af7"},{"_id": "638a5b847785e77de8326db2"}],"subtitles":[{"hours":{"$numberInt":"10"},"videos":[{"url":"a url","isWatched":false,"_id":{"$oid":"6383aa86e3d15919935601c9"}}],"exercises":[{"title":"question title","questions":[{"question":"question 1","correctAnswer":"this is the correct answer","choices":["first wrong answer","second wrong answer","this is the correct answer","3rd wrong answer"],"grade":false,"_id":{"$oid":"6383aa86e3d15919935601cb"}}],"isSolved":false,"_id":{"$oid":"6383aa86e3d15919935601ca"},"recievedGrade":{"$numberInt":"0"},"maxGrade":{"$numberInt":"1"}}],"_id":{"$oid":"6383aa86e3d15919935601c8"}}],"exam":{"title":"exam title","questions":[{"question":"question 1","correctAnswer":"this is the correct answer","choices":["first wrong answer","second wrong answer","this is the correct answer","3rd wrong answer"],"grade":false,"_id":{"$oid":"6383aa86e3d15919935601cd"}}],"isSolved":false,"_id":{"$oid":"6383aa86e3d15919935601cc"},"recievedGrade":{"$numberInt":"0"},"maxGrade":{"$numberInt":"1"}},"reviews":[],"createdAt":{"$date":{"$numberLong":"1669573254380"}},"updatedAt":{"$date":{"$numberLong":"1669668773063"}},"popularity":{"$numberInt":"0"},"__v":{"$numberInt":"0"},"refundRequests":[],"reports":[{"title":"Potter First Report","resolved":false,"seen":false,"authorType":"Trainee","_id":{"$oid":"6384b16976db8f704ede92ca"},"author":{"$oid":"635ec4f59be36d4f3b8887de"}},{"title":"Hooch First Report","resolved":false,"seen":false,"authorType":"CorprateTrainee","_id":{"$oid":"6384b1f10d67239c06cc12dd"},"author":{"$oid":"638228056ad03696f2616704"}},{"title":"Lupin First Report","resolved":false,"seen":false,"authorType":"Instructor","_id":{"$oid":"6384b1f80d67239c06cc12e0"},"author":{"$oid":"6382609c9e58f131af8f4db0"}},{"title":"Potter Second Report","resolved":false,"seen":false,"authorType":"Trainee","_id":{"$oid":"6384b4949152c9880d093f30"},"author":{"$oid":"635ec4f59be36d4f3b8887de"}},{"title":"Hooch Second Report","resolved":false,"seen":false,"authorType":"CorprateTrainee","_id":{"$oid":"6384b4a09152c9880d093f35"},"author":{"$oid":"638228056ad03696f2616704"}},{"title":"Lupin Second Report","resolved":false,"seen":false,"authorType":"Instructor","_id":{"$oid":"6384b4ab9152c9880d093f3b"},"author":{"$oid":"6382609c9e58f131af8f4db0"}},{"title":"test Report","resolved":false,"seen":false,"authorType":"Trainee","_id":{"$oid":"6384d58f6527b77577cae891"}},{"title":"Hooch First Report","resolved":false,"seen":false,"author":{"$oid":"638228056ad03696f2616704"},"authorType":"CorprateTrainee","_id":{"$oid":"6384d60a6527b77577cae899"}},{"title":"Snape First Report","resolved":false,"seen":false,"author":{"$oid":"6360d7ab62135c9591d1fc2d"},"authorType":"Instructor","_id":{"$oid":"6384d6386527b77577cae8a2"}}],"discount":0,"price":10,"rating":"5"}'
	);

	return (
		<>
			<PersonalInfo></PersonalInfo>
			<CourseTraineePOV course={myCourse}></CourseTraineePOV>
		</>
	);
}

export default TraineeView;
