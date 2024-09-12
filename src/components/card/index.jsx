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

const priorityLabels = {
    0: "No Priority",
    1: "Urgent",
    2: "High",
    3: "Medium",
    4: "Low"
};

const Card = ({ item, grouping }) => {
    return (
        <div className={classes.card_container} onClick={() => console.log(item)}>
            <div className={classes.card_header_container}>
                <div className={classes.card_id}>{item.id}</div>
                <div>
                    {
                        grouping !== 'user' &&
                        <div className={classes.user_container}>
                            <img className={classes.user_img} src={Images.User} alt='user' />
                            {
                                item.isAvailable === true ? (
                                    <div className={classes.active_container}></div>
                                ) : (
                                    <div className={classes.unactive_container}></div>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
            <div className={classes.content_container}>
                <div>
                    {
                        grouping !== 'status' && (
                            <img className={classes.icon} src={statusIcons[item.status]} alt='group' />
                        )
                    }
                </div>
                <div className={classes.content_title}>{item.title}</div>
            </div>
            <div className={classes.feature_container}>
                {
                    grouping !== 'priority' && (
                        <img className={classes.icon} src={statusIcons[priorityLabels[item.priority]]} alt='group' />
                    )
                }
                <div>
                    {
                        item.tag.map((feature, index) => (
                            <div key={index} className={classes.feature_title}>{feature}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Card