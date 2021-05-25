import {} from 'better-react-spinkit';
import Circle from 'better-react-spinkit/dist/Circle';

const Loading = () => {
    return (
        <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <img
                    src='https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png'
                    alt='Loading'
                    height='200'
                    style={{ marginBottom: 10 }}
                />
                <Circle color='#3CBC28' size={60} />
            </div>
        </center>
    );
};

export default Loading;
