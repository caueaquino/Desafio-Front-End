
export interface Plan {
    planName: string;
    planType: string;
    planResponsible: any;
    beginDate: Date;
    endDate: Date;
    showDate: string;
    details: {
        description: string;
        interested: string[];
        cost: DoubleRange;
        status: string;
    };
    childPlans: Plan[];
    id: any;
    parent: Plan;
}
