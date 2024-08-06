import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        paddingHorizontal: 8
    },
    image: {
        width: 80,
        height: '100%',
        borderRadius: 8,
        aspectRatio: 2/3
    },
    info: {
        marginLeft: 8,
        marginRight: 80
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    year: {
        fontSize: 14,
        color: 'gray',
    },
});
