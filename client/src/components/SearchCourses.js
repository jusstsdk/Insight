import { Button, Col, Form, Row, Collapse } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";
import { SUBJECTS } from "../functions/subjects";
import { Multiselect } from "multiselect-react-dropdown";
import { Rating } from "react-simple-star-rating";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

export default function SearchCourses({
  setCourses,
  searchInInstructorCourses,
  hideSearch,
  setCurrentPage,
  includeAll,
}) {
  const searchQuery = useRef("");
  const maxPriceFilter = useRef("");
  const minPriceFilter = useRef("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState([]);
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const [sort, setSort] = useState(false);
  const [open, setOpen] = useState(false);

  function comparePopularity(a, b) {
    if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
    if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
    return 0;
  }

  useEffect(() => {
    getCourses();
  }, [user.country, sort, ratingFilter, subjectFilter]);

  async function getCourses() {
    let searchParams = {};
    if (searchQuery.current.value)
      searchParams.searchQuery = searchQuery.current.value;
    if (subjectFilter) searchParams.subject = subjectFilter;
    if (maxPriceFilter.current.value)
      searchParams.maxPrice = (
        maxPriceFilter.current.value / user.exchangeRate
      ).toFixed(2);
    if (minPriceFilter.current.value)
      searchParams.minPrice = (
        minPriceFilter.current.value / user.exchangeRate
      ).toFixed(2);
    if (ratingFilter) searchParams.rating = ratingFilter;

    let courses;

    if (searchInInstructorCourses) {
      const response = await API.get(`instructors/${user._id}/courses`, {
        params: searchParams,
        headers: { authorization: "Bearer " + token }
      });
      courses = response.data.courses;
    } else {
      const response = await API.get("courses", {
        params: searchParams,
      });
      courses = response.data;
    }
    courses.forEach((course) => {
      course.originalPrice =
        Math.trunc(course.originalPrice * user.exchangeRate * 100) / 100;
      course.price = Math.trunc(course.price * user.exchangeRate * 100) / 100;
    });
    if (!includeAll) {
      courses = courses.filter((course) => course.status === "Published");
    }

    if (sort) courses.sort(comparePopularity);
    setCourses(courses);
    setCurrentPage(1);
  }

  const clearFilters = async () => {
    minPriceFilter.current.value = "";
    maxPriceFilter.current.value = "";
    setSubjectFilter("");
    setRatingFilter(0);
    await getCourses();
  };

  // Displays the Filter Bar
  const filterBar = (
    <>
      {!hideSearch && (
        <div className="d-flex">
          <Col sm={5} className=" align-items-center">
            <Multiselect
              id="singleSelectSubjects"
              options={SUBJECTS}
              singleSelect={false}
              selectedValues={subjectFilter}
              onSelect={(_, selectedItem) => {
                setSubjectFilter([...subjectFilter, selectedItem]);
              }}
              onRemove={(lastItem) => {
                setSubjectFilter(lastItem);
              }}
              isObject={false}
              placeholder="Select Subject Filter"
              closeOnSelect={true}
              showArrow={true}
              avoidHighlightFirstOption={true}
              hidePlaceholder={true}
            />
          </Col>

          <Col
            sm={3}
            className={`d-flex justify-content-around align-items-center ${
              !searchInInstructorCourses ? "mx-auto" : "ms-2"
            }`}
          >
            <Form.Label className="fitWidth my-auto">Price</Form.Label>
            <Col className="me-1" sm={4}>
              <Form.Control
                ref={minPriceFilter}
                onChange={async () => await getCourses()}
                type="number"
                placeholder="Min"
              />
            </Col>
            <Col className="" sm={4}>
              <Form.Control
                ref={maxPriceFilter}
                onChange={async () => await getCourses()}
                type="number"
                placeholder="Max"
              />
            </Col>
          </Col>

          {!searchInInstructorCourses && (
            <Col
              sm={3}
              className="d-flex  justify-content-between align-items-center "
            >
              <Form.Label className="fitWidth my-auto">Min Rating</Form.Label>
              <div className="fitWidth me-2">
                <Rating
                  allowFraction="true"
                  onClick={(rating) => setRatingFilter(rating)}
                  size={28}
                  initialValue={ratingFilter}
                />
              </div>
              <Button
                onClick={async () => await clearFilters()}
                className="clearRatingButton"
              >
                <AiOutlineClose color={"#dc3545"} />
              </Button>
            </Col>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      <Row className="mb-3 align-items-center">
        <Col sm={9}>
          <Form.Control
            ref={searchQuery}
            type="search"
            onChange={async () => await getCourses()}
            placeholder="Search for a course by name, subject or instructors"
          />
        </Col>

        <Col sm={2}>
          <Form.Check
            type="checkbox"
            id={"default-checkbox"}
            label="Sort by popularity"
            className="fitWidth"
            onChange={() => setSort(!sort)}
          />
        </Col>
        <Col sm={1} className="d-flex justify-content-end">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="filterBar"
            aria-expanded={open}
          >
            <BsFilter />
          </Button>
        </Col>
        <Collapse in={open}>
          <div id="filterBar" className="mt-3">
            {filterBar}
          </div>
        </Collapse>
      </Row>
    </>
  );
}
