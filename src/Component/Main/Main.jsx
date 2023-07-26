import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Table, Card, Form } from "react-bootstrap";
import {addWorkerAction,removeWorkerAction,}from "../../Store/reducers/workers";
import "./Main.css";
const Main = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const levels = useSelector((state) => state.levels.levels);
  const workers = useSelector((state) => state.workers.workers);
  const [sortWorkers, setSortWorkers] = React.useState(workers);
  const searchInputRef = React.useRef();

  React.useEffect(() => {
    setSortWorkers(workers);
  }, [workers]);

  const handleSearch = () => {
    const value = String(searchInputRef.current.value).toLowerCase();
    const sortedWorkers = workers.filter((worker) => {
      const arrayValues = Object.values(worker).map((worker) =>
        String(worker).toLowerCase()
      );
      let isExists = false;
      arrayValues.forEach((arrayValue) => {
        if (String(arrayValue).includes(value)) {
          isExists = true;
        }
      });
      return isExists;
    });
    setSortWorkers(sortedWorkers);
    return;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, lastname, phone, job, level } = evt.target.elements;
    const newWorker = {
      id: workers[workers.length - 1]?.id + 1 || 1,
      name: name.value.trim(),
      lastname: lastname.value.trim(),
      phone: phone.value.trim(),
      job: jobs.find((item) => item.id === Number(job.value.trim())).label,
      level: levels.find((item) => item.id === Number(level.value.trim()))
        .label,
    };
    dispatch(addWorkerAction(newWorker));
    evt.target.reset();
  };

  const handleRemove = (id) => {
    dispatch(removeWorkerAction(Number(id)));
  };

  return (
    <Row>
      <Col md="9">
        <div className="work px-2">
          <Row>
            <Col md="4">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                ref={searchInputRef}
                onChange={handleSearch}
              />
            </Col>

            <Col md="4">
              <div className="h2 text-center">Hodimlar</div>
            </Col>

            <Col md="4">
              <Button
                className="float-end"
                variant="success"
                type="submit"
                form="add"
              >
                Add
              </Button>
            </Col>
          </Row>

          <div className="table-responsive-sm table-responsive-md">
            <Table className="text-center" bordered>
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Familya</th>
                  <th>Telefon</th>
                  <th>Lavozim</th>
                  <th>Ilmiy daraja</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {!!sortWorkers.length &&
                  sortWorkers.map((worker) => {
                    return (
                      <tr key={worker.id}>
                        <td>{worker.id}</td>
                        <td>{worker.name}</td>
                        <td>{worker.lastname}</td>
                        <td>{worker.phone}</td>
                        <td>{worker.job}</td>
                        <td>{worker.level}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleRemove(worker.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Col>

      <Col md="3">
        <Card className="py-0 work">
          <div className="card-header">
            <h5>Hodim Qo'shish</h5>
          </div>

          <div className="card-body">
            <Form id="add" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                required
              />

              <Form.Control
                className="mt-2"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
              />

              <Form.Control
                className="mt-2"
                type="text"
                placeholder="Phone"
                name="phone"
                required
              />

              <Form.Select
                className="mt-2"
                name="job"
                defaultValue={jobs[0].value}
              >
                {!!jobs.length &&
                  jobs.map((job) => {
                    return (
                      <option value={job.id} key={job.id}>
                        {job.label}
                      </option>
                    );
                  })}
              </Form.Select>

              <Form.Select className="mt-2" name="level">
                {!!levels.length &&
                  levels.map((level) => {
                    return (
                      <option value={level.id} key={level.id}>
                        {level.label}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form>
          </div>

          <div className="card-footer">
            <Button
              className="float-end"
              variant="success"
              type="submit"
              form="add"
            >
              Add
            </Button>

            <Button
              className="float-end mx-2"
              variant="danger"
              type="reset"
              form="add"
            >
              Cancel
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Main;
