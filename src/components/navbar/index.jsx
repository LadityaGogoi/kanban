import { useState } from 'react'
import { Icons } from '../../constants'
import classes from './style.module.css'

const Navbar = ({ grouping, setGrouping, sortBy, setSortBy }) => {
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);

    const handleGroupingChange = (e) => {
        setIsDisplayOpen(!isDisplayOpen)
        setGrouping(e.target.value);
    };

    const handleSortByChange = (e) => {
        setIsDisplayOpen(!isDisplayOpen)
        setSortBy(e.target.value);
    };

    return (
        <div className={classes.wrapper_container}>
            <div className={classes.main_container}>
                <div onClick={() => setIsDisplayOpen(!isDisplayOpen)} className={classes.display_container}>
                    <img src={Icons.Display} className={classes.icon} alt='icon' />
                    <div>Display</div>
                    <img src={Icons.Down} className={classes.icon} alt='icon' />
                </div>
                {
                    isDisplayOpen && (
                        <div className={classes.display_option_container}>
                            <div className={classes.option_container}>
                                <div>Grouping</div>
                                <select className={classes.select_container} value={grouping} onChange={handleGroupingChange}>
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>
                            </div>
                            <div className={classes.option_container}>
                                <div>Ordering</div>
                                <select className={classes.select_container} value={sortBy} onChange={handleSortByChange}>
                                    <option value="priority">Priority</option>
                                    <option value="sortBy">Title</option>
                                </select>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
