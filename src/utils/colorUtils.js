export const getCategoryBackgroundColor = (color) => {
    switch (color) {
        case 'orange': return '#fff3e0';
        case 'pink': return '#fce4ec';
        case 'bluesky': return '#e3f2fd';
        case 'green': return '#e8f5e9';
        case 'purple': return '#f3e5f5';
        default: return '#f5f5f5';
    }
};

export const getCategoryTextColor = (color) => {
    switch (color) {
        case 'orange': return '#ff9800';
        case 'pink': return '#e91e63';
        case 'bluesky': return '#2196f3';
        case 'green': return '#4caf50';
        case 'purple': return '#9c27b0';
        default: return '#757575';
    }
};

export const getCategoryStyle = (color) => {
    return {
        backgroundColor: getCategoryBackgroundColor(color),
        color: getCategoryTextColor(color)
    };
};