
export interface Plan {
    planName: string;
    planType: string;
    planResponsible: string;
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
}
