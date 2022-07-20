'use strict';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return (
            <button onClick={() => { this.setState({ liked: true }) }}>
                Like
            </button>
        );
    }
}

const domContainers = document.querySelectorAll('.like_button_container');
domContainers.forEach((domContainer) => {
    const commentId = parseInt(domContainer.dataset.commentid, 10);
    const root = ReactDOM.createRoot(domContainer);
    root.render(
        <LikeButton commentId={commentId} />
    );
});
