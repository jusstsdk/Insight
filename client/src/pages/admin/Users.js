import { Button, Card, Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Users = () => {
  const [trainees, setTrainees] = useState();
  const [instructors, setInstructors] = useState();

	const token = useSelector((state) => state.userReducer.token);

  console.log(trainees);
  console.log(instructors);

  const getTrainees = async () => {
    const config = {
      method: "GET",				headers: { authorization: "Bearer " + token },
      url: `http://localhost:4000/api/trainees`,
    };
    try {
      const response = await axios(config);
      setTrainees(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getInstructors = async () => {
    const config = {
      method: "GET",
      url: `http://localhost:4000/api/instructors`,
      headers: { authorization: "Bearer " + token },
    };
    try {
      const response = await axios(config);
      setInstructors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBunUser = async (isBanned, userType, userId) => {
    const config = {
      method: "PUT",
      url: `http://localhost:4000/api/users/toggle-ban`,
      headers: { authorization: "Bearer " + token },
      data: { isBanned, userType, userId },
    };
    try {
      await axios(config);

      if (userType === "Trainee") {
        getTrainees();
      } else if (userType === "Instructor") {
        getInstructors();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrainees();
    getInstructors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        defaultActiveKey="Trainees"
        className="d-flex justify-content-start reportTabs"
      >
        <Tab eventKey="Trainees" title="Trainees">
          {trainees?.map((trainee) => (
            <>
              <Card.Body className={"d-flex justify-content-between my-4"}>
                <Card.Title className="p-1 my-2">{trainee.username}</Card.Title>

                <Card.Body className={"d-flex justify-content-end gap-2"}>
                  <Button
                    disabled={trainee.isBanned}
                    variant={'danger'}
                    onClick={() =>
                      toggleBunUser(!trainee.isBanned, "Trainee", trainee._id)
                    }
                  >
                    Блокировать
                  </Button>
                  <Button
                    disabled={!trainee.isBanned}
                    onClick={() =>
                      toggleBunUser(!trainee.isBanned, "Trainee", trainee._id)
                    }
                  >
                    Разблокировать
                  </Button>
                </Card.Body>
              </Card.Body>
            </>
          ))}
        </Tab>

        <Tab eventKey="Instructors" title="Instructors">
          <Card.Body className="d-flex justify-content-end p-1 my-2">
            {instructors?.map((trainee) => (
              <>
                <Card.Body className={"d-flex justify-content-between my-4"}>
                  <Card.Title className="p-1 my-2">
                    {trainee.username}
                  </Card.Title>

                  <Card.Body className={"d-flex justify-content-end gap-2"}>
                    <Button
                      disabled={trainee.isBanned}
                      variant={'danger'}
                      onClick={() =>
                        toggleBunUser(
                          !trainee.isBanned,
                          "Instructor",
                          trainee._id,
                        )
                      }
                    >
                      Блокировать
                    </Button>
                    <Button
                      disabled={!trainee.isBanned}
                      onClick={() =>
                        toggleBunUser(
                          !trainee.isBanned,
                          "Instructor",
                          trainee._id,
                        )
                      }
                    >
                      Разблокироват
                    </Button>
                  </Card.Body>
                </Card.Body>
              </>
            ))}
          </Card.Body>
        </Tab>
      </Tabs>
    </>
  );
};

export default Users;
