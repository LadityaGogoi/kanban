import { Icons } from '../../constants'
import Card from '../card';
import Header from '../header';
import classes from './style.module.css'

const groupByStatus = (tickets, users) => {
    const statusGroups = {
        "Backlog": [],
        "Todo": [],
        "In progress": [],
        "Done": [],
        "Canceled": []
    };

    tickets.forEach(ticket => {
        // Find the associated user for the ticket
        const user = users.find(user => user.id === ticket.userId);
        // Add availability information to each ticket
        const ticketWithAvailability = {
            ...ticket,
            isAvailable: user ? user.available : false
        };

        const status = ticket.status;
        if (statusGroups[status]) {
            statusGroups[status].push(ticketWithAvailability);
        }
    });
    return statusGroups;
};


const priorityLabels = {
    0: "No Priority",
    1: "Urgent",
    2: "High",
    3: "Medium",
    4: "Low"
};

const groupByPriority = (tickets, users) => {
    const priorityGroups = {
        "No Priority": [],
        "Urgent": [],
        "High": [],
        "Medium": [],
        "Low": []
    };

    tickets.forEach(ticket => {
        const priority = priorityLabels[ticket.priority] || "No Priority";
        const user = users.find(user => user.id === ticket.userId);
        const ticketWithAvailability = {
            ...ticket,
            isAvailable: user ? user.available : false
        };

        if (priorityGroups[priority]) {
            priorityGroups[priority].push(ticketWithAvailability);
        }
    });
    return priorityGroups;
};

const groupByUser = (tickets, users) => {
    return tickets.reduce((groups, ticket) => {
        // Find the associated user for the ticket
        const user = users.find(user => user.id === ticket.userId);
        const userName = user ? user.name : 'Unknown User';
        const userAvailable = user ? user.available : false; // Check availability

        // Add isAvailable to the ticket
        const ticketWithAvailability = {
            ...ticket,
            isAvailable: userAvailable
        };

        if (!groups[userName]) {
            groups[userName] = { tickets: [], available: userAvailable };
        }

        // Add the ticket with isAvailable to the user's tickets
        groups[userName].tickets.push(ticketWithAvailability);
        return groups;
    }, {});
};


const sortTickets = (tickets, sortBy) => {
    if (sortBy === 'Priority') {
        return tickets.sort((a, b) => (b.priority || 0) - (a.priority || 0));  // Use fallback for missing priority
    }
    if (sortBy === 'Title') {
        return tickets.sort((a, b) => (a.title || '').localeCompare(b.title || ''));  // Use fallback for missing titles
    }
    return tickets;
};

const Content = ({ grouping, sortBy, tickets, users }) => {
    const getGroupedData = () => {
        if (grouping === 'status') return groupByStatus(tickets, users);
        if (grouping === 'user') return groupByUser(tickets, users);
        if (grouping === 'priority') return groupByPriority(tickets, users);
    };

    const groupedData = getGroupedData();
    return (
        <div className={classes.wrapper_container}>
            {
                grouping === 'status' &&
                <div className={classes.main_container}>
                    {
                        Object.keys(groupedData).map((group) => (
                            <div key={group} className={classes.status_container}>
                                <Header grouping={grouping} title={group} total={groupedData[group].length} />
                                {sortTickets(groupedData[group], sortBy).map(ticket => (
                                    <Card key={ticket.id} item={ticket} grouping={grouping} />
                                ))}
                            </div>
                        ))
                    }
                </div>
            }
            {
                grouping === 'priority' &&
                <div className={classes.main_container}>
                    {
                        Object.keys(groupedData).map((group) => (
                            <div key={group} className={classes.status_container}>
                                <Header grouping={grouping} title={group} total={groupedData[group].length} />
                                {sortTickets(groupedData[group], sortBy).map(ticket => (
                                    <Card key={ticket.id} item={ticket} grouping={grouping} />
                                ))}
                            </div>
                        ))
                    }
                </div>
            }
            {
                grouping === 'user' &&
                <div className={classes.main_container}>
                    {
                        Object.keys(groupedData).map((group) => (
                            <div key={group} className={classes.status_container}>
                                <Header grouping={grouping} title={group} total={groupedData[group].tickets.length} isActive={groupedData[group].available} />
                                {sortTickets(groupedData[group].tickets, sortBy).map(ticket => (
                                    <Card key={ticket.id} item={ticket} grouping={grouping} />
                                ))}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Content