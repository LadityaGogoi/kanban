import { Icons, Images } from '../../constants'
import classes from './style.module.css'

const statusIcons = {
    "Backlog": Icons.Backlog,
    "Todo": Icons.Todo,
    "In progress": Icons.Inprogress,
    "Done": Icons.Done,
    "Canceled": Icons.Display,
    "No Priority": Icons.Nopriority,
    "Urgent": Icons.Urgentpriority,
    "High": Icons.Highpriority,
    "Medium": Icons.Mediumpriority,
    "Low": Icons.Lowpriority
};

const Header = ({ grouping, title, total, isActive }) => {
    return (
        <div className={classes.header_container}>
            <div className={classes.header_left_container}>
                {
                    grouping !== 'user' ?
                        <img className={classes.icon} src={statusIcons[title]} alt='group' />
                        :
                        <div className={classes.user_container}>
                            <img className={classes.user_img} src={Images.User} alt='user' />
                            {
                                isActive && (
                                    <div className={classes.active_container}></div>
                                )
                            }
                        </div>
                }
                <div className={classes.header_title}>{title}</div>
                <div className={classes.header_subtitle}>{total}</div>
            </div>
            <div className={classes.header_right_container}>
                <img className={classes.icon} src={Icons.Add} alt='add' />
                <img className={classes.icon} src={Icons.Dots} alt='dot' />
            </div>
        </div>
    )
}

export default Header