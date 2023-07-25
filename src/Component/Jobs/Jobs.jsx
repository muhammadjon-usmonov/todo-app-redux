/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Table, Card, Form } from "react-bootstrap";
import { addJobAction, removeJobAction, editedJobs } from "../../Store/reducers/jobs";
import "./Jobs.css";

const Jobs = () => {
	const dispatch = useDispatch();
	const jobs = useSelector((state) => state.jobs.jobs);
	const [updatingId, setUpdatingId] = useState(null);
	const [sortJobs, setSortJobs] = React.useState(jobs);
	const searchInputRef = React.useRef();

	React.useEffect(() => {
		setSortJobs(jobs);
	}, [jobs]);

	const handleSearch = () => {
		const value = String(searchInputRef.current.value).toLowerCase();
		const sortedJobs = jobs.filter((job) =>
			String(job.label).toLowerCase().includes(value),
		);
		setSortJobs(sortedJobs);
		return;
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const { name, salary } = evt.target.elements;

		if (!updatingId) {
			const newJob = {
				id: jobs[jobs.length - 1]?.id + 1 || 1,
				label: name.value.trim(),
				salary: salary.value.trim(),
			};
			dispatch(addJobAction(newJob));
		} else {
      dispatch(
				editedJobs({
					id: updatingId,
					label: name.value.trim(),
					salary: +salary.value.trim(),
				}),
			);
            setUpdatingId(null)
		}

		evt.target.reset();
	};

	const handleRemove = (id) => {
		dispatch(removeJobAction(Number(id)));
	};
  const handleEdit = (id) => {
		const job = jobs.find((item) => item?.id === id);
		document.querySelector("#add > input:nth-child(1)").value =
			job?.label;
		document.querySelector("#add > input.mt-2.form-control").value =
			job?.salary;
		setUpdatingId(id);
	};
	return (
		<Row>
			<Col md='9'>
				<div className='work px-2'>
					<Row>
						<Col md='4'>
							<input
								className='form-control'
								type='text'
								placeholder='Search'
								ref={searchInputRef}
								onChange={handleSearch}
							/>
						</Col>

						<Col md='4'>
							<div className='h2 text-center'>Lavozim</div>
						</Col>
					</Row>

					<div className='table-responsive-sm table-responsive-md'>
						<Table
							className='text-center'
							bordered>
							<thead className='thead-dark'>
								<tr>
									<th>#</th>
									<th>Lavozim</th>
									<th>Oylik daraja</th>
									<th>Edit/Delete</th>
								</tr>
							</thead>

							<tbody>
								{!!sortJobs.length &&
									sortJobs.map((job) => {
										return (
											<tr key={job.id}>
												<td>{job.id}</td>
												<td>{job.label}</td>
												<td>${job.salary}</td>
												<td>
													<Button
														variant='success'
														onClick={() =>
															handleEdit(job.id)
														}>
														Edit
													</Button>
													<Button
														className='mx-1'
														variant='danger'
														onClick={() =>
															handleRemove(job.id)
														}>
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

			<Col md='3'>
				<Card className='py-0 work'>
					<div className='card-header'>
						<h5>Lavozim qo'shish</h5>
					</div>

					<div className='card-body'>
						<Form
							id='add'
							onSubmit={handleSubmit}>
							<Form.Control
								type='text'
								placeholder='Lavozim'
								name='name'
								required
							/>

							<Form.Control
								className='mt-2'
								type='text'
								placeholder='Oylik'
								name='salary'
								required
							/>
						</Form>
					</div>

					<div className='card-footer'>
						<Button 
							className='float-end'
							variant='success'
							type='submit'
							form='add'>
							{updatingId ? "Edit": "Add"}
						</Button>

						<Button
							className='float-end mx-2'
							variant='danger'
							type='reset'
							form='add'>
							Cancel
						</Button>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default Jobs;
