const transform = require('../index');

const object = {
    firstName: 'Rod',
    lastName: 'Kras',
    address: {
        street: 'Elm',
        number: '7787'
    },
    avatar: 'http://url.to.avatar',
    userName: 'Rod-user'
};

const schema = {
    name: 'firstName',
    address: 'address.street',
    profile: {
        avatar: 'avatar',
        userName: 'username'
    },
    fullName: obj => `${obj.firstName} ${obj.lastName}`
};

test('should return same value for the prop name and firstName', () => {
    const response = transform(schema, object);

    expect(response.name).toBe(object.firstName);

});

test('should return same value for the prop avatar, in a diferent structure', () => {
    const response = transform(schema, object);

    expect(response.profile.avatar).toBe(object.avatar);

});

test('should return same value for the prop avatar, in a diferent structure', () => {
    const response = transform(schema, object);

    expect(response.fullName).toBe(`${object.firstName} ${object.lastName}`);

});