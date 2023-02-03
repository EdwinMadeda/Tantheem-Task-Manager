import format from "date-fns/format";
import CarouselSlider from "../../reusableComponents/CarouselSlider";
import ToActionBtn from "../../reusableComponents/ToActionBtn";
import CustomLink from "../../reusableComponents/CustomLink";

const RecentItem = (props) => {
  const { item, pathname } = props;

  // const dateLabel = Boolean(item.endDate) ? "Due date" : "Created At";
  // const date = format(
  //   new Date(item?.endDate ?? item.createdAt),
  //   "'Due date: ' MM/dd/yyyy"
  // );

  return (
    <div className="Recent__Item">
      <div className="Content">
        <p>
          <CustomLink className="Title" to={pathname + "/" + item.id}>
            {item.name.substring(0, 18) + "..."}
          </CustomLink>
          <span className="Duedate">
            {format(
              new Date(item?.endDate ?? item.createdAt),
              `'${item?.endDate ? "Due date" : "Created At"}: ' MM/dd/yyyy`
            )}
          </span>
        </p>
        <p className="Description">
          {item?.description.substring(0, 150) + "..." ?? ""}
        </p>
      </div>
    </div>
  );
};

const RecentItemList = (items, pathname) => {
  return items.map((item) => (
    <RecentItem key={item.id} item={item} pathname={pathname} />
  ));
};

const RecentItems = ({ label, pathname, items }) => {
  return (
    <CarouselSlider
      className={`Recent ${label}`}
      title={<ToActionBtn label={label} linkTo={pathname} />}
      content={RecentItemList(items, pathname)}
    />
  );
};

export default RecentItems;
