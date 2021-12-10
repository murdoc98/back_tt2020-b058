import { getRepository } from "typeorm";

import Group from '../../src/models/Group.model';

export default async(name: string) => {
    const group = await getRepository(Group)
        .createQueryBuilder('group')
        .where('group.name = :name', { name })
        .getOne();
    if(!group) throw Error('No group');
    return group;
};
