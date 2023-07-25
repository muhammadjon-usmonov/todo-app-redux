import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLevelAction, editedLevelAction, removeLevelAction } from "../../Store/reducers/levels";
import { Row, Col, Button, Table, Card, Form } from "react-bootstrap";

const Level = () => {
	const dispatch = useDispatch();
	const levels = useSelector((state) => state.levels.levels);
	// const initialValue = useSelector((state) => state.levels.initailValue);
	const [sortLevels, setSortLevels] = useState(levels);
	const [updatingId, setUpdatingId] = useState(null);
	const searchInputRef = useRef();
	useEffect(() => {
		setSortLevels(levels);
	}, [levels]);

	const handleSearch = () => {
		const value = String(searchInputRef.current.value).toLocaleLowerCase();

		const sortedLevels = levels.filter((level) =>
			String(level.label).toLowerCase().includes(value),
		);
		setSortLevels(sortedLevels);
		return;
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const { name, salary } = evt.target.elements;
		if (!updatingId) {
			const newLevels = {
				id: levels[levels.length - 1]?.id + 1 || 1,
				label: name.value.trim(),
				salary: +salary.value.trim(),
			};
			dispatch(addLevelAction(newLevels));
		} else {
			dispatch(
				editedLevelAction({
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
		dispatch(removeLevelAction(id));
	};
	const handleEdit = (id) => {
		const level = levels.find((item) => item?.id === id);
		document.querySelector("#add > input:nth-child(1)").value =
			level?.label;
		document.querySelector("#add > input.mt-2.form-control").value =
			level?.salary;
		setUpdatingId(id);
	};
	// console.log(handleEdit);

	return (
		<>
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
										<th>Darajasi</th>
										<th>Maoshi</th>
										<th>Edit/Delete</th>
									</tr>
								</thead>

								<tbody>
									{!!sortLevels.length &&
										sortLevels.map((level) => {
											return (
												<tr key={level.id}>
													<td>{level.id}</td>
													<td>{level.label}</td>
													<td>${level.salary}</td>
													<td>
														<Button
															variant='success'
															onClick={() =>
																handleEdit(
																	level.id,
																)
															}>
															Edit
														</Button>
														<Button
															className='mx-1'
															variant='danger'
															onClick={() =>
																handleRemove(
																	level.id,
																)
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
							<h5>Ilmiy daraja qo'shish</h5>
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
								{updatingId ? "Edit" : "Add"}
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
		</>
	);
};

export default Level;
