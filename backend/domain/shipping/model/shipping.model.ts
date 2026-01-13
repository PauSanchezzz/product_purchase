export class ShippingInformationModel {
 constructor(
    public id: number,
    public customer: string,
    public customerEmail: string,
    public address: string,
    public country: string = 'CO',
    public region: string,
    public city: string,
    public postalCode: string,
    public phone: string,
 ) {
    
 }   
}