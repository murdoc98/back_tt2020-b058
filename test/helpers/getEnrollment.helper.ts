import { getRepository } from "typeorm";

import Enrollment from "../../src/models/Enrollment.model";

export default async(groupId: string, status: boolean) => {
    const enrollment = await getRepository(Enrollment)
        .createQueryBuilder('enrollment')
        .where('enrollment.groupId = :groupId', { groupId })
        .andWhere('enrollment.status = :status', { status })
        .getOne();
    if(!enrollment) throw Error('No enrollment not accepted');
    return enrollment;
}