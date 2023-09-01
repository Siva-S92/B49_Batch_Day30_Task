import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
 
function Layout(props) {
  return (
    <div>
        <Navbar expand="lg" variant="dark" bg="success">
          <Container>
            <Navbar.Brand className='mx-auto fw-bold fs-2'>Fruits Bucket</Navbar.Brand>
          </Container>
        </Navbar>
      <Container>{props.children}</Container>
    </div>
  );
}
export default Layout;