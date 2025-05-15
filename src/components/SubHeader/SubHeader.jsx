import './SubHeader.css';

const SubHeader = () => {
  return (
    <div className="sub-header">
        <div className="container-fluid">
            <div>
                <ul className="list-submenu">
                    <li className="item-submenu">
                        <a className="link-subheader" href="">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none"><rect width="2.273" height="2.273" x="3.955" y="3.955" stroke="currentcolor" rx="1.136"/><path stroke="currentcolor" strokeLinecap="round" d="m9.182 11.636 3.272 3.273M10 7.545l4.91 4.91"/><path stroke="currentcolor" strokeLinecap="round" stroke-linejoin="round" d="m10.223 17.64-8.61-8.277A2 2 0 0 1 1 7.92V4.283a2 2 0 0 1 .586-1.414l1.283-1.283A2 2 0 0 1 4.283 1h3.638a2 2 0 0 1 1.442.614l4.523 4.704 3.755 3.905a2 2 0 0 1-.028 2.8l-4.59 4.59a2 2 0 0 1-2.8.028Z"/></svg></span>
                            <span className="text">Tặng màn 240Hz khi Build PC</span>
                        </a>
                    </li>
                    <li className="item-submenu">
                        <a className="link-subheader" href="">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><path stroke="currentcolor" strokeLinecap="round" stroke-linejoin="round" d="M14.5 3.25h3.375A1.125 1.125 0 0 1 19 4.375V16.75A2.25 2.25 0 0 1 16.75 19m0 0a2.25 2.25 0 0 1-2.25-2.25V2.125A1.125 1.125 0 0 0 13.375 1H2.125A1.125 1.125 0 0 0 1 2.125v13.5A3.375 3.375 0 0 0 4.375 19H16.75ZM4 11.5h7M4 15h7"/><rect width="7" height="3" x="4" y="5" stroke="currentcolor" rx="1"/></svg></span>
                            <span className="text">Tin công nghệ</span>
                        </a>
                    </li>
                    <li className="item-submenu">
                        <a className="link-subheader" href="">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" version="1.0" viewBox="0 0 30 30"><path d="M10 9.9c-3 2.9-4.1 8.3-2.1 9.5.5.3.9-.9.8-2.8-.2-5.8 4.8-9.5 10.1-7.5 3.3 1.3 3.7 1.2 3.7-.3 0-.6-2-1.3-4.8-1.5-4.2-.4-5.1-.1-7.7 2.6z"/><path d="M13.3 11.4c-3.4 1.6-3.2 7.7.2 9.3 4.1 1.9 7.5-.3 7.5-4.8 0-2.6-.5-3.8-1.7-4.3-1-.3-2.2-.8-2.8-1-.5-.2-2 .2-3.2.8zm4.7 1.9c2 1.6 1.9 3.9-.2 5.5-3.5 2.6-7.2-2.8-3.8-5.5.8-.7 1.7-1.2 2-1.2.3 0 1.2.5 2 1.2z"/><path d="M14.2 15.7c.4 2.3 3.2 2.3 3.6 0 .2-1.2-.3-1.7-1.8-1.7s-2 .5-1.8 1.7z"/><path d="M23.3 15.4c.2 5.5-4.8 9.5-9.5 7.7-3.3-1.3-4.3-1.2-4.3.1 0 .6 2 1.3 4.8 1.5 4.2.4 5.1.1 7.7-2.6 3-2.9 4.1-8.3 2.1-9.5-.5-.3-.9.9-.8 2.8z"/></svg></span>
                            <span className="text">Dịch vụ sửa chữa</span>
                        </a>
                    </li>
                    <li className="item-submenu">
                        <a className="link-subheader" href="">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="none"><rect width="18" height="13" x="1" y=".5" stroke="currentcolor" rx="2.5"/><path fill="currentcolor" d="M1.25 3h18v2h-18z"/></svg></span>
                            <span className="text">Dịch vụ kỹ thuật tại nhà</span>
                        </a>
                    </li>
                    <li className="item-submenu">
                        <a className="link-subheader" href="">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="none"><path fill="currentcolor" d="M4.958 1.789c-1.089.295-2.17.616-3.243.963a.55.55 0 0 0-.374.439c-.634 4.676.83 8.088 2.574 10.336.74.961 1.62 1.808 2.614 2.512.396.275.745.473 1.02.6.138.064.25.107.336.133A.635.635 0 0 0 8 16.8a.712.712 0 0 0 .114-.029c.087-.025.2-.068.336-.132a7.142 7.142 0 0 0 1.02-.6 12.168 12.168 0 0 0 2.615-2.512c1.745-2.247 3.208-5.66 2.574-10.336a.536.536 0 0 0-.374-.44c-.744-.239-2-.63-3.243-.961C9.774 1.45 8.607 1.2 8 1.2c-.606 0-1.774.25-3.042.589ZM4.654.63C5.894.298 7.21 0 8 0c.789 0 2.106.298 3.346.63 1.269.338 2.548.737 3.3.979.314.102.593.29.804.54.211.252.346.556.389.88.681 5.036-.9 8.769-2.817 11.238a13.365 13.365 0 0 1-2.877 2.76 8.208 8.208 0 0 1-1.198.703c-.32.148-.664.27-.947.27-.283 0-.626-.122-.947-.27a8.21 8.21 0 0 1-1.198-.703 13.366 13.366 0 0 1-2.877-2.76C1.061 11.797-.52 8.065.161 3.028a1.72 1.72 0 0 1 .39-.878c.21-.252.489-.439.803-.541a72.23 72.23 0 0 1 3.3-.979Z"/><path fill="currentcolor" d="M11.262 5.79a.562.562 0 0 1 .124.613.562.562 0 0 1-.124.183L7.833 9.96a.572.572 0 0 1-.623.122.572.572 0 0 1-.186-.122L5.31 8.273a.563.563 0 0 1-.124-.613.563.563 0 0 1 .31-.305.58.58 0 0 1 .623.122l1.31 1.29 3.024-2.978a.572.572 0 0 1 .623-.122c.07.028.133.07.186.122Z"/></svg></span>
                            <span className="text">Thu cũ đổi mới</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
export default SubHeader