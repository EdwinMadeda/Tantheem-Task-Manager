import format from 'date-fns/format';
import CarouselSlider from '../../reusableComponents/CarouselSlider/CarouselSlider';
import ToActionBtn from '../../reusableComponents/ToActionBtn';
import CustomLink from '../../reusableComponents/CustomLink';
import { RiTeamFill } from 'react-icons/ri';
import { trimStr } from '../../utils/constants';

const RecentItem = (props) => {
  const { item, pathname } = props;
  const isTypeSelf = item?.type?.includes('self');

  // const dateLabel = Boolean(item.endDate) ? "Due date" : "Created At";
  // const date = format(
  //   new Date(item?.endDate ?? item.createdAt),
  //   "'Due date: ' MM/dd/yyyy"
  // );

  return (
    <div className={`Recent__Item ${isTypeSelf ? 'self' : 'team'}`}>
      <div className="Content">
        <p className="head">
          <CustomLink className="Title" to={pathname + '/' + item.id}>
            {trimStr(item.name, 50)}
          </CustomLink>
          {!isTypeSelf && props.label !== 'Teams' && (
            <CustomLink className="banner" to={`/teams/${item.teamId}`}>
              <RiTeamFill /> Team-based
            </CustomLink>
          )}
        </p>
        <p className="Description">{trimStr(item?.description ?? '', 200)}</p>
        <p className="Duedate">
          {format(new Date(item.createdAt), `'Created On: 'E do MMM,yyyy`)}
        </p>
      </div>
    </div>
  );
};

const RecentItemList = (items, pathname, label) => {
  return items.map((item) => (
    <RecentItem key={item.id} item={item} pathname={pathname} label={label} />
  ));
};

const RecentItems = ({ label, pathname, items }) => {
  return (
    <CarouselSlider
      className={`Recent ${label}`}
      title={<ToActionBtn label={label} linkTo={pathname} />}
      content={RecentItemList(items, pathname, label)}
    />
  );
};

export default RecentItems;
