import { createSlice } from "@reduxjs/toolkit";

export const createCourseSlice = createSlice({
  name: "createCourse",
  initialState: {
    examTitle: "",
    examQuestions: [],

    subtitles: [],
    subtitlesIndices: [],
  },
  reducers: {
    setExamsAndSubtitles: (state, action) => {
      state.examTitle = action.payload.exam.title;
      state.examQuestions = action.payload.exam.questions;
      state.subtitles = action.payload.subtitles;
    },
    // Exam
    setExamTitle: (state, action) => {
      state.examTitle = action.payload;
    },
    addToExamQuestions: (state, action) => {
      state.examQuestions = [...state.examQuestions, action.payload];
    },
    editExamQuestion: (state, action) => {
      state.examQuestions[action.payload.key] = action.payload.question;
    },
    removeExamQuestions: (state, action) => {
      state.examQuestions = state.examQuestions.filter(
        (question, i) => i !== action.payload,
      );
    },

    // SubtitleInfo
    addSubtitle: (state, action) => {
      state.subtitles = [...state.subtitles, action.payload];
      state.subtitlesIndices = [...state.subtitlesIndices, 0];
    },
    editSubtitleInfo: (state, action) => {
      state.subtitles[action.payload.key].title = action.payload.subtitle.title;
    },
    removeSubtitle: (state, action) => {
      state.subtitles = state.subtitles.filter((_, i) => i !== action.payload);
      state.subtitlesIndices = state.subtitlesIndices.filter(
        (_, i) => i !== action.payload,
      );
    },

    // Videos
    addVideoToSubtitle: (state, action) => {
      state.subtitles[action.payload.subtitleKey].videos = [
        ...state.subtitles[action.payload.subtitleKey].videos,
        action.payload.video,
      ];
      state.subtitlesIndices[action.payload.subtitleKey] += 1;
      state.subtitles[action.payload.subtitleKey].seconds +=
        action.payload.seconds;
    },
    editVideoOfSubtitle: (state, action) => {
      let oldIndex =
        state.subtitles[action.payload.subtitleKey].videos[
          action.payload.videoKey
        ].index;
      state.subtitles[action.payload.subtitleKey].videos[
        action.payload.videoKey
      ] = {
        ...action.payload.video,
        index: oldIndex,
      };
      state.subtitles[action.payload.subtitleKey].seconds +=
        action.payload.seconds;
      state.subtitles[action.payload.subtitleKey].seconds -=
        action.payload.oldSeconds;
    },
    removeVideoFromSubtitle: (state, action) => {
      let updatedExercises = state.subtitles[
        action.payload.subtitleKey
      ].exercises.map((exercise) =>
        exercise.index > action.payload.videoIndex
          ? { ...exercise, index: exercise.index - 1 }
          : exercise,
      );
      let updatedVideos = action.payload.newVideos.map((video) =>
        video.index > action.payload.videoIndex
          ? { ...video, index: video.index - 1 }
          : video,
      );
      state.subtitles[action.payload.subtitleKey].exercises = updatedExercises;
      state.subtitles[action.payload.subtitleKey].videos = updatedVideos;
      state.subtitlesIndices[action.payload.subtitleKey] -= 1;

      state.subtitles[action.payload.subtitleKey].videos = updatedVideos;
      state.subtitles[action.payload.subtitleKey].seconds -=
        action.payload.oldSeconds;
    },

    // ExerciseInfo
    addExerciseToSubtitle: (state, action) => {
      state.subtitles[action.payload.subtitleKey].exercises = [
        ...state.subtitles[action.payload.subtitleKey].exercises,
        action.payload.exercise,
      ];
      state.subtitlesIndices[action.payload.subtitleKey] += 1;
    },
    editExerciseOfSubtitle: (state, action) => {
      state.subtitles[action.payload.subtitleKey].exercises[
        action.payload.exerciseKey
      ].title = action.payload.title;
    },
    removeExerciseFromSubtitle: (state, action) => {
      let updatedExercises = action.payload.newExercises.map((exercise) =>
        exercise.index > action.payload.exerciseIndex
          ? { ...exercise, index: exercise.index - 1 }
          : exercise,
      );
      let updatedVideos = state.subtitles[
        action.payload.subtitleKey
      ].videos.map((video) =>
        video.index > action.payload.exerciseIndex
          ? { ...video, index: video.index - 1 }
          : video,
      );
      state.subtitles[action.payload.subtitleKey].exercises = updatedExercises;
      state.subtitles[action.payload.subtitleKey].videos = updatedVideos;
      state.subtitlesIndices[action.payload.subtitleKey] -= 1;
      state.subtitles[action.payload.subtitleKey].seconds -=
        120 * action.payload.numberOfQuestions;
    },

    // ContentInfo
    addContentToSubtitle: (state, action) => {
      state.subtitles[action.payload.subtitleKey].content = [
        ...(state.subtitles[action.payload.subtitleKey].content || []),
        action.payload.content,
      ];
      state.subtitlesIndices[action.payload.subtitleKey] += 1;
    },
    editContentOfSubtitle: (state, action) => {
      state.subtitles[action.payload.subtitleKey].content[action.payload.contentKey] = action.payload.content
    	// state.subtitles[action.payload.subtitleKey].exercises[action.payload.exerciseKey].title =
    	// 	action.payload.title;
    },
    removeContentFromSubtitle: (state, action) => {
      let updatedExercises = state.subtitles[
        action.payload.subtitleKey
      ].exercises.map((exercise) =>
        exercise.index > action.payload.videoIndex
          ? { ...exercise, index: exercise.index - 1 }
          : exercise,
      );
      let updatedVideos = state.subtitles[
        action.payload.subtitleKey
      ].videos.map((video) =>
        video.index > action.payload.exerciseIndex
          ? { ...video, index: video.index - 1 }
          : video,
      );
      let updatedContent = action.payload.newContent.map((content) =>
        content.index > action.payload.exerciseIndex
          ? { ...content, index: content.index - 1 }
          : content,
      );
      state.subtitles[action.payload.subtitleKey].exercises = updatedExercises;
      state.subtitles[action.payload.subtitleKey].videos = updatedVideos;
      state.subtitles[action.payload.subtitleKey].content = updatedContent;
      state.subtitlesIndices[action.payload.subtitleKey] -= 1;
      // state.subtitles[action.payload.subtitleKey].seconds -= 120 * action.payload.numberOfQuestions;
    },

    // Questions
    addQuestionToExercise: (state, action) => {
      state.subtitles[action.payload.subtitleKey].exercises[
        action.payload.exerciseKey
      ].questions = [
        ...state.subtitles[action.payload.subtitleKey].exercises[
          action.payload.exerciseKey
        ].questions,
        action.payload.question,
      ];
      state.subtitles[action.payload.subtitleKey].seconds += 120;
    },
    editQuestionOfExercise: (state, action) => {
      state.subtitles[action.payload.subtitleKey].exercises[
        action.payload.exerciseKey
      ].questions[action.payload.questionKey] = action.payload.question;
    },
    removeQuestionFromExercise: (state, action) => {
      console.log(action.payload);
      state.subtitles[action.payload.subtitleKey].exercises[
        action.payload.exerciseKey
      ].questions = action.payload.newQuestions;
      state.subtitles[action.payload.subtitleKey].seconds -= 120;
    },

    // Clear
    clearCreateCourse: (state, action) => {
      state.examTitle = "";
      state.examQuestions = [];
      state.subtitles = [];
      state.subtitlesIndices = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setExamsAndSubtitles,
  setExamTitle,
  addToExamQuestions,
  editExamQuestion,
  removeExamQuestions,
  addSubtitle,
  editSubtitleInfo,
  addVideoToSubtitle,
  editVideoOfSubtitle,
  removeVideoFromSubtitle,
  addExerciseToSubtitle,
  editExerciseOfSubtitle,
  removeExerciseFromSubtitle,
  addQuestionToExercise,
  editQuestionOfExercise,
  removeQuestionFromExercise,
  removeSubtitle,
  clearCreateCourse,
  addContentToSubtitle,
  editContentOfSubtitle,
  removeContentFromSubtitle,
} = createCourseSlice.actions;

export default createCourseSlice.reducer;
