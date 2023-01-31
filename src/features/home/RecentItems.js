import format from "date-fns/format";
import CarouselSlider from "../../reusableComponents/CarouselSlider";
import ToActionBtn from "../../reusableComponents/ToActionBtn";
import CustomLink from "../../reusableComponents/CustomLink";

const RecentItem = (props)=>{
    const {item, pathname} = props;

    return (
        <div className="Recent__Item">
            <div className="Content">
            <p>
                <CustomLink
                    className="Title"
                    to={pathname + '/' + item.id}>
                    {item.name.substring(0,18)+'...'}
                </CustomLink>
                {Boolean(item?.endDate) && 
                <span className="Duedate">{format(new Date(item.endDate), "'Due date: ' MM/dd/yyyy")}</span>}
                
            </p>
            <p className="Description">{item?.description.substring(0, 150)+'...' ?? ''}</p>
            </div>
        </div>
      )
}

const RecentItemList = (items, pathname) => {
    
   return items.map(item => 
        <RecentItem 
            key={item.id} 
            item={item} 
            pathname={pathname}/>
        )

}

const RecentItems = ({label, pathname ,items}) => {
  return (
    <CarouselSlider 
        className={`Recent ${label}`}
        title={<ToActionBtn label={label} linkTo={pathname} />}
        content={RecentItemList(items, pathname)}
    />
  )
}

export default RecentItems