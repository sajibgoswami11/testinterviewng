import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/dashboard'
    },
    {
        name: 'Task Setting',
        children:[
            {
                name: 'Project List',url:'/project/list',icon:'icon-arrow-right-circle'
            },


        
        ]
    }
];