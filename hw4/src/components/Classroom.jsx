import { useEffect, useState } from "react";
import Student from "./Student";
import { Button, Container, Form, Col, Row, Pagination } from "react-bootstrap";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/s26/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setStudents(data);
            console.log(data);
        })
    }, []);

    const trimmedName = searchName.trim();
    const trimmedMajor = searchMajor.trim();
    const trimmedInterest = searchInterest.trim();

    const filteredStudents = students.filter(s => {
        const fullName = s.name.first.toLowerCase() + " " + s.name.last.toLowerCase();
        const nameMatch = trimmedName === "" || s.name.first.toLowerCase().includes(trimmedName.toLowerCase()) || s.name.last.toLowerCase().includes(trimmedName.toLowerCase()) || fullName.includes(trimmedName.toLowerCase());
        const majorMatch = trimmedMajor === "" || s.major.toLowerCase().includes(trimmedMajor.toLowerCase());
        const interestMatch = trimmedInterest === "" || s.interests.some(i => i.toLowerCase().includes(trimmedInterest.toLowerCase()));
        return nameMatch && majorMatch && interestMatch;
    })

    const totalPages = Math.ceil(filteredStudents.length / 24);
    const pagedStudents = filteredStudents.slice((pageNum - 1) * 24, pageNum * 24);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"
                value={searchName}
                onChange={e => {
                    setSearchName(e.target.value);
                    setPageNum(1);
                }}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"
                value={searchMajor}
                onChange={e => {
                    setSearchMajor(e.target.value);
                    setPageNum(1);
                }}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"
                value={searchInterest}
                onChange={e => {
                    setSearchInterest(e.target.value);
                    setPageNum(1);
                }}
            />
            <br />
            <Button type="button" variant="neutral" onClick={() => {
                setSearchName("");
                setSearchMajor("");
                setSearchInterest("");
                setPageNum(1);
            }}>Reset Search</Button>
        </Form>
        <p id="num-results">There are {filteredStudents.length} student(s) matching your search.</p>

        <Container fluid>
            <Row id='students'>
                { /* TODO Students go here! Leave <Row> id there.*/ 
                students.length > 0 ? 
                    pagedStudents.map(s => <Col xs={12} md={6} lg={4} xl={3} key={s.id}>
                        <Student {...s} /></Col>
                    ) : <p>Loading...</p>
                
                }
            </Row>
        </Container>

        <Pagination>
            <Pagination.Prev
                disabled={totalPages === 0 || pageNum === 1}
                onClick={() => setPageNum(p => p - 1)}
            >
                Previous
            </Pagination.Prev>

            {Array.from({length: totalPages}, (_, i) => i + 1).map(page =>
                <Pagination.Item 
                    key={page}
                    active={page === pageNum}
                    onClick={() => setPageNum(page)}
                >
                    {page}
                </Pagination.Item>
            )}

            <Pagination.Next
                disabled={totalPages === 0 || pageNum === totalPages}
                onClick={() => setPageNum(p => p + 1)}
            >
                Next
            </Pagination.Next>
        </Pagination>
        
    </div>

}

export default Classroom;