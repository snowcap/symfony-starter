<?php

namespace Photolorent\SiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;


class DefaultController extends Controller
{
    /**
     * @Route("/", name="photolorent_site_default_index")
     * @Template()
     */
    public function indexAction()
    {
        $fm = $this->get('photolorent.file_manager');

        $directory = 'uploads/home/';

        $files = $fm->getFiles($directory);

        return array('files' => $files, 'directory' => $directory);
    }

    /**
     * @Route("/wedding", name="photolorent_site_default_wedding")
     * @Template()
     */
    public function weddingAction()
    {
        $fm = $this->get('photolorent.file_manager');

        $directory = 'uploads/mariages/mariannenicolas/';

        $files = $fm->getFiles($directory);

        return array('files' => $files, 'directory' => $directory);
    }

    /**
     * @Route("/on-stage", name="photolorent_site_default_onstage")
     * @Template()
     */
    public function onstageAction()
    {
        $fm = $this->get('photolorent.file_manager');

        $directory = 'uploads/onstage/';

        $files = $fm->getFiles($directory);

        return array('files' => $files, 'directory' => $directory);
    }
    /**
     * @Route("/art-sport", name="photolorent_site_default_artsport")
     * @Template()
     */
    public function artsportAction()
    {
        $fm = $this->get('photolorent.file_manager');

        $directory = 'uploads/artsport/';

        $files = $fm->getFiles($directory);

        return array('files' => $files, 'directory' => $directory);
    }
}
