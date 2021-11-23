import { getRepository } from "typeorm";

import Group from '../../src/models/Group.model';

export default async() => {
    const group = await getRepository(Group)
        .createQueryBuilder('group')
        .getOne();
    if(!group) throw Error('No group');
    return group;
}