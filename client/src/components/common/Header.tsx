import { getDeviceServer } from '@/lib/server.helper';
import pageService from '@/service/page.service';
import HeaderPc from '@/components/common/HeaderPc';
import HeaderMobile from '@/components/common/HeaderMobile';

const Header = async () => {
  const device = await getDeviceServer();
  const navData = await pageService.getNavigateStructure();

  if (device === 'pc') return <HeaderPc navData={navData} />;
  if (device === 'mobile') return <HeaderMobile navData={navData} />;
  return null;
};

export default Header;
