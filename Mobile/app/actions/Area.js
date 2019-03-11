import {
    TOGGLE_APPLET,
    TOGGLE_SERVICE, UPDATE_APPLETS,
    UPDATE_SERVICES,
} from "../constants/AreaActionTypes";
import axios from 'axios';

function toggleUpdatedApplet(updatedApplets) {
    return {
        type: TOGGLE_APPLET,
        applets: updatedApplets
    }
}

function updateAppletElementInArray(applets, element) {
    return applets.map((item) => {
        if (item.name !== element.name) {
            return item;
        }
        return {
            ...item,
            checked: !item.checked,
            id: element.id,
        }
    });
}


function enableApplet(applet, props) {
    axios.post(`http://${props.server}:3000/api/areas`, {
        service_name: applet.service,
        area: {
            name: applet.name,
            params: [],
        },
    }, {
        headers: {'Authorization': `Bearer ${props.token}`}
    }).then(res => {
        props.dispatchApplets(updateAppletElementInArray(props.applets, res.data))
    }).catch(err => {});
}

function disableApplet(applet, props) {
    axios.delete(`http://${props.server}:3000/api/areas/${applet.id}`, {
        headers: {'Authorization': `Bearer ${props.token}`}
    }).then(res => {
        props.dispatchApplets(updateAppletElementInArray(props.applets, applet))
    }).catch(err => {});
}

export function toggleApplet(index, props) {
    let newArray = props.applets.map((item, i) => {
        if (i !== index) {
            return item;
        }
        let checked = !item.checked;
        if (checked) {
            enableApplet(item, props);
        } else {
            disableApplet(item, props)
        }
        return {
            ...item,
            checked,
        }
    });
    return (dispatch) => {
        dispatch(toggleUpdatedApplet(newArray));
    }
}

function toggleUpdatedServices(updatedServices) {
    return {
        type: TOGGLE_SERVICE,
        services: updatedServices,
    }
}

function appletsUpdate(applets) {
    return {
        type: UPDATE_APPLETS,
        applets: applets,
    }
}

export function updateApplets(applets) {
    return (dispatch) => {
        dispatch(appletsUpdate(applets))
    }
}

function updateServiceElementInArray(services, element) {
    return services.map((item) => {
        if (item.id !== element.name) {
            return item;
        }
        return {
            ...item,
            activate: !item.activate,
            uuid: element.id,
        }
    });
}

function enableService(service, props) {
    axios.post(`http://${props.server}:3000/api/services`, {
        name: service.id,
        areas: [],
    }, {
        headers: {'Authorization': `Bearer ${props.token}`}
    }).then(res => {
        props.dispatchServices(updateServiceElementInArray(props.services, {
            id: res.data.id,
            name: res.data.name
        }));
    }).catch(err => {});
}

function disableService(service, props) {
    axios.delete(`http://${props.server}:3000/api/services/${service.uuid}`, {
        headers: {'Authorization': `Bearer ${props.token}`}
    }).then(res => {
        props.dispatchServices(updateServiceElementInArray(props.services, {
            id: service.uuid,
            name: service.id,
        }));
    }).catch(err => {});
}

export function toggleService(id, props) {
    let newArray = props.services.map((item) => {
        if (item.id !== id) {
            return item;
        }
        let activate = !item.activate;
        if (activate) {
            enableService(item, props);
        } else {
            disableService(item, props)
        }
        return {
            ...item,
            activate,
        }
    });
    return (dispatch) => {
        dispatch(toggleUpdatedServices(newArray))
    }
}

function serviceUpdate(services) {
    return {
        type: UPDATE_SERVICES,
        services: services
    }
}

export function updateServices(services) {
    return (dispatch) => {
        dispatch(serviceUpdate(services));
    }
}