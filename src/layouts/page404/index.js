import BackBtn from '../../reusableComponents/BackBtn';
import './page404.css';
const Page404 = () => {
  return (
    <section className="Page404 main">
      <div className="Page-ClipArt top-right"></div>
      <div className="Page-ClipArt bottom-left"></div>
      <BackBtn />
      <h1 className="msg404">There's nothing here: 404!</h1>
    </section>
  );
};
export default Page404;
