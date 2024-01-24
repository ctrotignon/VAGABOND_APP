"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CalloutMap = () => {
    return (<react_native_1.View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, width: 'auto' }}>
			<react_native_1.Text style={styles.calloutTitle}>{marker.title}</react_native_1.Text>
			<react_native_1.View style={styles.callOutContent}>
				<Image source={getIconName(marker.type)} style={{ width: 50, height: 50 }}/>
				<react_native_1.View>
					<react_native_1.Text style={styles.modalDate}>Le {date}</react_native_1.Text>
					<react_native_1.Text multiline={true} style={styles.callOutDescription}>
						{marker.description}
					</react_native_1.Text>
				</react_native_1.View>
			</react_native_1.View>
			<react_native_1.Text style={styles.coordinatesText}>
				Lat:{marker === null || marker === void 0 ? void 0 : marker.latitude}, Long:{marker === null || marker === void 0 ? void 0 : marker.longitude}
			</react_native_1.Text>
		</react_native_1.View>);
};
const styles = {
    modalTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'orange',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'JustAnotherHand',
        paddingBottom: 70,
        flex: 1,
    },
    modalDate: {
        marginBottom: 10,
    },
    closingCross: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    closingCrossText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    coordinatesText: {
        marginBottom: 10,
        color: '#0084b4',
    },
    picker: {
        marginBottom: 10,
    },
    inputTitle: {
        marginTop: 50,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'auto',
    },
    inputDescription: {
        height: '20%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'auto',
    },
    buttonContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    calloutTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'orange',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'JustAnotherHand',
        paddingBottom: 10,
        flex: 1,
        width: 100,
    },
    callOutContent: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    callOutDescription: {
        flexWrap: 'wrap',
        fontWeight: 'bold',
        width: 200,
        fontSize: 18,
    },
};
exports.default = CalloutMap;
